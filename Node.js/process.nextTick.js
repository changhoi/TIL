setImmediate(() => {
  console.log('immediate');
}); // 우선순위 2 즉시 실행 함수

Promise.resolve().then(() => console.log('promise'));
// 우선순위 1

process.nextTick(() => {
  console.log('nextTick');
}); // 우선순위 1

setTimeout(() => {
  console.log('timeout');
}, 0); // 우선순위 3
