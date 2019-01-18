{
  console.log("FORWARD");
  let ar = [1, 2, 3]; // loop-optimizer: FORWARD, POSSIBLE_UNDEFINED

  let _a = ar;
  let _f = console.log;

  for (let _i = 0; _i < _a.length && _a[_i] !== undefined; _i++) {
    _f(_a[_i], _i, _a);
  }
}
{
  console.log("KEEP");
  let ar = [1, 2, 3]; // loop-optimizer: KEEP

  ar.forEach(console.log);
}
{
  console.log("nothing");
  let ar = [1, 2, 3]; // nothing

  let _a2 = ar;
  let _f2 = console.log;

  for (let _i2 = _a2.length; _i2--;) {
    _f2(_a2[_i2], _i2, _a2);
  }
}
