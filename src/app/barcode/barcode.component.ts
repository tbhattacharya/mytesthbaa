import * as Quagga from 'quagga';
import { Component, AfterViewInit } from '@angular/core';


@Component({
    selector: 'app-barcode',
    templateUrl: './barcode.component.html'
})

export class BarcodeComponent implements AfterViewInit {
    public _scannerIsRunning = false;


    ngAfterViewInit(): void {
        this.startScanner();
    }
    public startScanner() {
        console.log('Quagga', Quagga);
        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                target: document.querySelector('#scanner-container'),
                constraints: {
                    width: { max: 320 },
                    height: { max: 240 },
                    aspectRatio: { min: 1, max: 100 },
                    facingMode: 'environment' // or user
                }
            },
            locator: {
                patchSize: 'medium',
                halfSample: true
            },
            numOfWorkers: 2,
            frequency: 10,
            decoder: {
                readers: [{
                    format: 'code_128_reader',
                    config: {}
                }]
            },
            locate: true
        }
            /* {
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: document.querySelector('#scanner-container'),
                constraints: {
                    width: 480,
                    height: 320,
                    facingMode: 'environment'
                },
            },
            decoder: {
                readers: [
                    'code_128_reader'
                ],
                debug: {
                    showCanvas: true,
                    showPatches: true,
                    showFoundPatches: true,
                    showSkeleton: true,
                    showLabels: true,
                    showPatchLabels: true,
                    showRemainingPatchLabels: true,
                    boxFromPatches: {
                        showTransformed: true,
                        showTransformedBox: true,
                        showBB: true
                    }
                }
            },

        } */, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log('Initialization finished. Ready to start');
                Quagga.start();

                // Set flag to is running
                // this._scannerIsRunning = true;
            });

        Quagga.onProcessed(function (result) {
            const drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width'), 10),
                        parseInt(drawingCanvas.getAttribute('height'), 10));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 2 });
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                }
            }
        });


        Quagga.onDetected(function (result) {
            console.log('Barcode detected and processed : [' + result.codeResult.code + ']', result);
        });
    }
}
