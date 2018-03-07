import * as Quagga from 'quagga';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';


@Component({
    selector: 'app-barcode',
    templateUrl: './barcode.component.html'
})

export class BarcodeComponent implements AfterViewInit, OnDestroy {

    public _scannerIsRunning = false;


    ngAfterViewInit(): void {
        try {
            this.startScanner();
        } catch (e) {
            console.log(e);
        }
    }

    public startScanner() {
        console.log('Quagga', Quagga);
        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                //target: document.querySelector('#scanner-container'),
                constraints: {
                    width: { max: 640 },
                    height: { max: 480 },
                    aspectRatio: { min: 1, max: 100 },
                    facingMode: 'environment' // or user
                }
            },
            locator: {
                patchSize: 'small',
                halfSample: true
            },
            numOfWorkers: 4,
            frequency: 10,
            decoder: {
                readers: [{
                    format: 'ean_reader',
                    config: {}
                }]
            },
            locate: true
        }, function (err) {
            if (err) {
                console.log(err);
                return;
            }

            console.log('Initialization finished. Ready to start');
            Quagga.start();
        });

        Quagga.onProcessed(function (result) {
            let drawingCtx = Quagga.canvas.ctx.overlay;
            let drawingCanvas = Quagga.canvas.dom.overlay;

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
            alert(result.codeResult.code);
        });
    }

    ngOnDestroy(): void {
        Quagga.stop();
    }
}
