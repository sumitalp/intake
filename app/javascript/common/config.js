export function config() {
  const {org: {intake: {config = {}} = {}} = {}} = window
  return config
}

export function isConfigOptionTrue(option) {
  return config()[option]
}

export function isFeatureActive(feature) {
  return Boolean(config().active_features) && config().active_features.includes(feature)
}

export function isFeatureInactive(feature) {
  return !isFeatureActive(feature)
}

export function jsClipboardSupported() {
  return window.clipboardData === undefined
}

export function sdmPath() {
  return config().sdm_path
}
