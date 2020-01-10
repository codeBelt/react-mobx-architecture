
// type X = Optional<{ a: string; b: string; }, 'b'> -> { a: string; b?: string; }
type Optional<T, K extends keyof T> = Omit<T, K> & {
    [P in K]?: T[P];
}
