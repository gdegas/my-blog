---
title: Useful all around utility functions
date: "2020-08-01T20:35:03.284Z"
description: "JS utilities"
---

##Utilities

#### Custom Error

```js
class CustomError extends Error {
  constructor(message, { responseCode, error, ...details } = {}, ...rest) {
    if (error) {
      if (error instanceof CustomError) {
        message = error.message
      } else {
        if (message) {
          message = `${message}: ${error.message || error}`
        } else {
          message = error.message || error
        }
      }
    }

    super(message, ...rest)

    this.name = "CustomError"

    this.responseCode =
      responseCode || (error && error.responseCode) || "UNKNOWN"

    this.details = {
      ...details,
      ...(error && error.details),
    }

    if (error instanceof Error) {
      this.stack = error.stack
    }
  }
}
```

Usage:

```js
test("CustomError - with error having details", () => {
  const origErr = new Error("this happened")
  origErr.details = { foo: "bar" }
  let err = new CustomError("Bad news", {
    error: origErr,
  })

  expect(err).toBeInstanceOf(CustomError)
  expect(err.name).toBe("CustomError")
  expect(err.message).toBe("Bad news: this happened")
  expect(err.responseCode).toBe("UNKNOWN")
  expect(err.details).toEqual({ foo: "bar" })
  expect(err.stack).toBe(origErr.stack)

  err = new CustomError("Bad news", {
    error: origErr,
    foo: "boo",
    boo: "foo",
  })

  expect(err).toBeInstanceOf(CustomError)
  expect(err.name).toBe("CustomError")
  expect(err.message).toBe("Bad news: this happened")
  expect(err.responseCode).toBe("UNKNOWN")
  expect(err.details).toEqual({
    foo: "bar",
    boo: "foo",
  })
  expect(err.stack).toBe(origErr.stack)
})
```
