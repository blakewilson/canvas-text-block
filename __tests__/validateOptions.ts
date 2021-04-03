import CanvasTextBlock from '../src/CanvasTextBlock'
import defaultOptions from '../src/definitions/defaultConfig'
import { CanvasTextBlockOptions } from '../src/types'

const canvas = document.createElement('canvas')

test('it should validate the default config', () => {
    const instance = new CanvasTextBlock(canvas, 0, 0, 100, 100)

    expect((instance as any).getOptions()).toStrictEqual(defaultOptions)
})

test('it should validate custom config', () => {
    const customConfig: CanvasTextBlockOptions = {
        color: '#000',
        fontFamily: 'MonoLisa',
        fontSize: 50,
        lineHeight: 75,
        weight: 'bold',
        ellipsis: false,
        overflow: true,
        backgroundColor: 'green'
    }

    const instance = new CanvasTextBlock(canvas, 0, 0, 100, 100, customConfig)

    expect((instance as any).getOptions()).toStrictEqual(customConfig)
})