import { backgroundImageChange } from './background-image-change.js';

export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event){
        event = event || window.event
        event.preventDefault()

        window.history.pushState({}, "", event.target.href)

        this.handle()
    }

    handle() {
        const { pathname }  = window.location
        //console.log(pathname)
        const route = this.routes[pathname] //|| this.routes[404]
        fetch(route)
        .then(data => {
            //console.log(data)
            return data.text()
        })
        .then(html => {
            //console.log(html)
            console.log(pathname)
            document.querySelector('#app').innerHTML = html
            backgroundImageChange(pathname);
        })
    }
}
