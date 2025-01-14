function Stop_mais_pas_tout () {
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, 0)
}
function Gauche () {
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 1023)
    pins.analogWritePin(AnalogPin.P16, 0)
}
input.onButtonPressed(Button.A, function () {
    while (Zero == 0) {
        OLED12864_I2C.clear()
        OLED12864_I2C.showNumber(
        0,
        0,
        makerbit.getUltrasonicDistance(DistanceUnit.CM),
        1
        )
        basic.pause(500)
        if (makerbit.getUltrasonicDistance(DistanceUnit.CM) < 18) {
            Stop_mais_pas_tout()
            Gauche()
            basic.pause(400)
        } else if (input.buttonIsPressed(Button.AB)) {
            Stop()
        } else {
            OLED12864_I2C.clear()
            OLED12864_I2C.showNumber(
            0,
            0,
            makerbit.getUltrasonicDistance(DistanceUnit.CM),
            1
            )
            Avancer()
        }
    }
})
makerbit.onIrButton(IrButton.Any, IrButtonAction.Released, function () {
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
})
input.onButtonPressed(Button.AB, function () {
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, 0)
    basic.pause(1000)
    WaitUntilBlocks.waitUntilButtonPressed(Button.A)
    WaitUntilBlocks.waitUntilButtonPressed(Button.B)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, 0)
})
makerbit.onIrButton(IrButton.Any, IrButtonAction.Pressed, function () {
    pins.analogWritePin(AnalogPin.P14, 1023)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, 1023)
})
function Avancer () {
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 1023)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, 1022)
}
input.onButtonPressed(Button.B, function () {
    if (input.buttonIsPressed(Button.AB)) {
        pins.analogWritePin(AnalogPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.analogWritePin(AnalogPin.P15, 0)
        pins.analogWritePin(AnalogPin.P16, 0)
    } else {
        for (let index = 0; index < 15; index++) {
            pins.analogWritePin(AnalogPin.P16, 360)
            pins.analogWritePin(AnalogPin.P15, 0)
            pins.analogWritePin(AnalogPin.P14, 1023)
            pins.analogWritePin(AnalogPin.P13, 0)
            basic.pause(1000)
            pins.analogWritePin(AnalogPin.P14, 360)
            pins.analogWritePin(AnalogPin.P13, 0)
            pins.analogWritePin(AnalogPin.P16, 1023)
            pins.analogWritePin(AnalogPin.P15, 0)
            basic.pause(1000)
        }
    }
})
function Stop () {
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, 0)
    basic.pause(500)
    WaitUntilBlocks.waitUntilButtonReleased(Button.A)
    WaitUntilBlocks.waitUntilButtonReleased(Button.B)
    basic.pause(500)
    WaitUntilBlocks.waitUntilButtonPressed(Button.A)
    WaitUntilBlocks.waitUntilButtonPressed(Button.B)
}
let Led4: neopixel.Strip = null
let Led3: neopixel.Strip = null
let Zero = 0
for (let index = 0; index < 1000000; index++) {
    basic.pause(200)
    makerbit.connectIrReceiver(DigitalPin.P7, IrProtocol.NEC)
}
Zero = 0
makerbit.connectUltrasonicDistanceSensor(DigitalPin.P12, DigitalPin.P9)
led.enable(false)
let strip = neopixel.create(DigitalPin.P6, 4, NeoPixelMode.RGB)
OLED12864_I2C.init(60)
let Capteur_droit = 0
let Capteur_gauche = 0
basic.forever(function () {
    Led3 = strip.range(2, 1)
    Led3.showColor(neopixel.colors(NeoPixelColors.Blue))
    basic.pause(1000)
    Led4 = strip.range(3, 1)
    Led4.showColor(neopixel.colors(NeoPixelColors.Indigo))
    basic.pause(2000)
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    basic.pause(1000)
})
