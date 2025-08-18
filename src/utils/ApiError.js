class ApiError extends Error{
    constructor(
        statusCode,
        message="something Went Wrong",
        errors=[],
        statck=""

    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false;
        this.errors=errors

        if(statck){
            this.stack=statck
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}

/*Key concepts in play

extends Error: Makes ApiError behave like a normal error (it has message, name, stack) but lets you add API-specific fields.

super(message): Initializes the base Error part with your message; without it, message/stack won’t be set properly.

Default parameters (message = ..., errors = [], statck = ""): Let callers omit those arguments.

Error.captureStackTrace(...): Node/V8 method that builds a stack trace starting from the call site (omitting the constructor). In browsers that don’t support it, you could fall back to new Error(message).stack.
*/