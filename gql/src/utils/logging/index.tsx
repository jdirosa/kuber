export function log(message: string, obj?: any) {
  const time = new Date();
  if (obj) {
    console.log(
      `${time.toUTCString()}: ${message}`,
      JSON.stringify(obj, null, 2)
    );
    return;
  }
  console.log(`${time.toUTCString()}: ${message}`);
}
export function logError(message: string, err?: any) {
  const time = new Date();
  if (err) {
    console.error(
      `${time.toUTCString()}: ${message}`,
      JSON.stringify(err, null, 2)
    );
    return;
  }
  console.error(`${time.toUTCString()}: ${message}`);
}
