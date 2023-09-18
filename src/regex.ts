// email:
// ^[a-zA-Z0-9._%+-]+: Matches one or more characters at the start of the string, including letters (both uppercase and lowercase), digits, and special characters like ".", "_", "%", "+", and "-".
// @: Matches the "@" symbol.
// [a-zA-Z0-9.-]+: Matches one or more characters for the domain part, including letters, digits, ".", and "-".
// \.: Matches the dot (".") before the top-level domain.
// [a-zA-Z]{2,}$: Matches at least two or more letters for the top-level domain (e.g., "com", "org").
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// password:
// Minimum eight characters, at least one uppercase letter, one lowercase letter, 
// one number and one special character:
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
