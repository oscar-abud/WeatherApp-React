import './index.css'
import Card from '../components/card'
import Footer from '../components/footer'

export default function Index() {
    return (
        <div className='body'>
            <h1>WeatherApp</h1>
            <Card />
            <Footer />
        </div>
    )
}