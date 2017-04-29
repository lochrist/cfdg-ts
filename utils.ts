export namespace utils {
    export function identity () : Array<number> {
        return [1, 0, 0, 1, 0, 0];
    };

    export function adjustTransform(transform: Array<number>, adjustment: Array<number>): Array<number> {
        return [
            transform[0] * adjustment[0] + transform[2] * adjustment[1],
            transform[1] * adjustment[0] + transform[3] * adjustment[1],
            transform[0] * adjustment[2] + transform[2] * adjustment[3],
            transform[1] * adjustment[2] + transform[3] * adjustment[3],
            transform[0] * adjustment[4] + transform[2] * adjustment[5] + transform[4],
            transform[1] * adjustment[4] + transform[3] * adjustment[5] + transform[5]
        ];
    };

    export function adjustColor(color: Array<number>, adjustment: Array<number>, target: Array<number>) : Array<number> {
        color = color.slice();
        let a, t;

        if (a = adjustment[0]) {
            if (adjustment[4] & 1) {
                t = target[0];
                if (a > 0) {
                    if (t < color[0]) t += 360;
                    color[0] += (t - color[0]) * a;
                } else {
                    if (t > color[0]) t -= 360;
                    color[0] += (color[0] - t) * a;
                }
            } else {
                color[0] += adjustment[0];
            }
            color[0] %= 360;
            if (color[0] < 0) color[0] += 360;
        }

        for (let i = 1; i < 4; i++) {
            if (a = adjustment[i]) {
                if (adjustment[4] & (1 << i)) {
                    if (a > 0) {
                        color[i] += (target[i] - color[i]) * a;
                    } else {
                        color[i] += (color[i] - (color[i] < target[i] ? 0 : 1)) * a;
                    }
                } else {
                    if (a > 0) {
                        color[i] += (1 - color[i]) * a;
                    } else {
                        color[i] += color[i] * a;
                    }
                }
            }
        }

        return color;
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