export function prefersLightweightEffects() {
  const device = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  return Boolean(device.connection?.saveData || (device.deviceMemory && device.deviceMemory <= 2));
}
