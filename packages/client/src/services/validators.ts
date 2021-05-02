type Validator = (v: string) => true | string;

export function required(name: string): Validator {
  return v => !!v || `${name} is required`;
}

export function maxLength(name: string, length: number): Validator {
  return v => v.length <= length || `${name} muse be ${length} characters or less`;
}

export function minLength(name: string, length: number): Validator {
  return v => v.length >= length || `${name} muse be at least ${length} characters long`;
}

export function validUrl(name: string): Validator {
  return v => {
    if (!v.startsWith("https://")) {
      return `${name} must start with https://`;
    }
    if (!v.match(/^https:\/\/[^\s/$.?#]+\.[^\s]+$/i)) {
      return `${name} must be a valid URL`;
    }
    return true;
  };
}

/**
 * an regular expression for validating emails
 *
 * taken from https://emailregex.com
 */
// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validEmail(name: string): Validator {
  return v => !!v.match(emailRegex) || `${name} must be a valid email address`;
}
