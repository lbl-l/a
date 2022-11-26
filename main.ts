function 暂停 () {
    motor.motorStopAll()
}
function 右转 () {
    motor.MotorRun(motor.Motors.M1, motor.Dir.CW, 255)
    motor.MotorRun(motor.Motors.M2, motor.Dir.CCW, 255)
    motor.MotorRun(motor.Motors.M3, motor.Dir.CCW, 255)
    motor.MotorRun(motor.Motors.M4, motor.Dir.CW, 255)
}
function 左转 () {
    motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, 255)
    motor.MotorRun(motor.Motors.M2, motor.Dir.CW, 255)
    motor.MotorRun(motor.Motors.M3, motor.Dir.CW, 255)
    motor.MotorRun(motor.Motors.M4, motor.Dir.CCW, 255)
}
function 左移 () {
    motor.MotorRun(motor.Motors.M1, motor.Dir.CW, 255)
    motor.MotorRun(motor.Motors.M2, motor.Dir.CW, 255)
    motor.MotorRun(motor.Motors.M3, motor.Dir.CW, 255)
    motor.MotorRun(motor.Motors.M4, motor.Dir.CW, 255)
}
input.onButtonPressed(Button.A, function () {
    if (pwm < 1008) {
        pwm += 16
        pins.analogWritePin(AnalogPin.P0, pwm)
    }
})
function 后退 () {
    motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, 255)
    motor.MotorRun(motor.Motors.M2, motor.Dir.CCW, 255)
    motor.MotorRun(motor.Motors.M3, motor.Dir.CW, 255)
    motor.MotorRun(motor.Motors.M4, motor.Dir.CW, 255)
}
function 前进 () {
    motor.MotorRun(motor.Motors.M1, motor.Dir.CW, 255)
    motor.MotorRun(motor.Motors.M2, motor.Dir.CW, 255)
    motor.MotorRun(motor.Motors.M3, motor.Dir.CCW, 255)
    motor.MotorRun(motor.Motors.M4, motor.Dir.CCW, 255)
}
input.onButtonPressed(Button.AB, function () {
    let 电池电量 = 0
    music.playMelody("C5 B A G F E D C ", 120)
    if (电池电量 < 10) {
        music.stopAllSounds()
    } else {
        music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "1") {
        前进()
    } else if (receivedString == "2") {
        后退()
    } else if (receivedString == "3") {
        左移()
    } else if (receivedString == "4") {
        右移()
    } else if (receivedString == "5") {
        左转()
    } else if (receivedString == "6") {
        右转()
    } else {
        暂停()
    }
})
input.onButtonPressed(Button.B, function () {
    if (pwm >= 16) {
        pwm += -16
        pins.analogWritePin(AnalogPin.P0, pwm)
    }
})
function 右移 () {
    motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, 255)
    motor.MotorRun(motor.Motors.M2, motor.Dir.CCW, 255)
    motor.MotorRun(motor.Motors.M3, motor.Dir.CCW, 255)
    motor.MotorRun(motor.Motors.M4, motor.Dir.CCW, 255)
}
let pwm = 0
basic.showIcon(IconNames.Heart)
pwm = 0
pins.analogWritePin(AnalogPin.P0, pwm)
radio.setGroup(1)
radio.setTransmitPower(7)
pins.servoWritePin(AnalogPin.P16, 95)
IR.init(Pins.P14)
basic.forever(function () {
    if (GHBit.Rocker(GHBit.enRocker.Up)) {
        radio.sendString("1")
        basic.showArrow(ArrowNames.North)
    } else if (GHBit.Rocker(GHBit.enRocker.Down)) {
        radio.sendString("2")
        basic.showArrow(ArrowNames.South)
    } else if (GHBit.Rocker(GHBit.enRocker.Left)) {
        radio.sendString("3")
        basic.showArrow(ArrowNames.West)
    } else if (GHBit.Rocker(GHBit.enRocker.Right)) {
        radio.sendString("4")
        basic.showArrow(ArrowNames.East)
    } else if (GHBit.Button(GHBit.enButton.B1, GHBit.enButtonState.Press)) {
        radio.sendString("5")
        basic.showLeds(`
            . . # . .
            . # . . .
            # . . . #
            . # . # .
            . . # . .
            `)
    } else if (GHBit.Button(GHBit.enButton.B4, GHBit.enButtonState.Press)) {
        radio.sendString("6")
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . . . # .
            . . # . .
            `)
    } else {
        radio.sendString("7")
        basic.showIcon(IconNames.SmallHeart)
    }
})
