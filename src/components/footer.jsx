import IconoGithub from './github.jsx'
import './footer.css'

export default function Footer() {
    return (
        <footer>
            <div className="containerFooter">
                <a href="https://github.com/oscar-abud" target='_blank'>
                    <IconoGithub /> by <strong>Oscar Palma</strong> 2025.
                </a>
            </div>
        </footer>
    )
}