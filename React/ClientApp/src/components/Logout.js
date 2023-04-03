export function Logout() {
    sessionStorage.clear();
    window.location.replace("https://localhost:44475");
}