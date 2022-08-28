

export class themeChangeEventSubscriber{

    constructor() {
        if(themeChangeEventSubscriber._instance){
            return themeChangeEventSubscriber._instance
        }
        themeChangeEventSubscriber._instance = this
        themeChangeEventSubscriber._subscribers = []
    }

    addSubscriber = (subscriber) => {
        themeChangeEventSubscriber._subscribers.push(subscriber)
    }

    notify = (bgColor, textColor) => {
        console.log("notification triggered")
        themeChangeEventSubscriber._subscribers.forEach((subscriber) => {
            console.log("notifying", subscriber)
            subscriber(bgColor, textColor)
        })
    }




}