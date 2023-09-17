
export function configHandler() {
    const config = document.getElementById("config") as HTMLElement;
    const config_nav = document.getElementById("config-nav") as HTMLElement;
    
    config.addEventListener('click', () => {
        config_nav.classList.toggle('config-aside-open')
    })
    
}