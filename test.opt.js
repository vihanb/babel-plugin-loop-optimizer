{
    let _a = console.log("FORWARD")
    // loop-optimizer: FORWARD
    [(1, 2, 3)];
    let _f = console.log;

    for (let _i = _a.length; _i--;) {
        _f(_a[_i], _i, _a);
    }
}

{
    let _a2 = console.log("KEEP")
    // loop-optimizer: KEEP
    [(1, 2, 3)];
    let _f2 = console.log;

    for (let _i2 = _a2.length; _i2--;) {
        _f2(_a2[_i2], _i2, _a2);
    }
}

{
    let _a3 = console.log("nothing")
    // nothing
    [(1, 2, 3)];
    let _f3 = console.log;

    for (let _i3 = _a3.length; _i3--;) {
        _f3(_a3[_i3], _i3, _a3);
    }
}
