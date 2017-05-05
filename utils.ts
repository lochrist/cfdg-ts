export namespace utils {
    export function identity(): Transform {
        return [1, 0, 0, 1, 0, 0];
    };

    export function adjustTransform(transform: Transform, adjustment: Transform): Transform {
        return [
            transform[0] * adjustment[0] + transform[2] * adjustment[1],
            transform[1] * adjustment[0] + transform[3] * adjustment[1],
            transform[0] * adjustment[2] + transform[2] * adjustment[3],
            transform[1] * adjustment[2] + transform[3] * adjustment[3],
            transform[0] * adjustment[4] + transform[2] * adjustment[5] + transform[4],
            transform[1] * adjustment[4] + transform[3] * adjustment[5] + transform[5]
        ];
    };

    export function adjustColor(color: Color, adjustment: Color): Color {
        color = color.slice() as Color;

        // https://github.com/MtnViewJohn/context-free/wiki/Shape-Adjustments
        // add num to the drawing hue value, modulo 360
        color[0] += adjustment[0];
        color[0] %= 360;

        // range [-1,1]. If num<0 then change the drawing saturation num% toward 0. If num>0 then change the drawing saturation num% toward 1.
        for (let i = 1; i < 4; ++i) {
            if (adjustment[i] > 0) {
                color[i] += adjustment[i] * (1 - color[i]);
            } else {
                color[i] += adjustment[i] * color[i];
            }
        }

        return color;
    };

    export function defaultColor(): Color {
        return [0, 0, 0, 1];
    };

    export function hsv2rgb(h: number, s: number, v: number, a: number) : Array<number> {
        let r, g, b;
        if (s == 0) {
            r = g = b = Math.round(v * 0xff);
        } else {
            v *= 0xff;
            h = ((h %= 360) < 0 ? h + 360 : h) / 60;
            let hi = h | 0;
            switch (hi) {
                case 0:
                    r = Math.round(v);
                    g = Math.round(v * (1 - (1 - h + hi) * s));
                    b = Math.round(v * (1 - s));
                    break;
                case 1:
                    r = Math.round(v * (1 - s * h + s * hi));
                    g = Math.round(v);
                    b = Math.round(v * (1 - s));
                    break;
                case 2:
                    r = Math.round(v * (1 - s));
                    g = Math.round(v);
                    b = Math.round(v * (1 - (1 - h + hi) * s));
                    break;
                case 3:
                    r = Math.round(v * (1 - s));
                    g = Math.round(v * (1 - s * h + s * hi));
                    b = Math.round(v);
                    break;
                case 4:
                    r = Math.round(v * (1 - (1 - h + hi) * s));
                    g = Math.round(v * (1 - s));
                    b = Math.round(v);
                    break;
                case 5:
                    r = Math.round(v);
                    g = Math.round(v * (1 - s));
                    b = Math.round(v * (1 - s * h + s * hi));
                    break;
            }
        }
        return [r, g, b, a];
    }
}