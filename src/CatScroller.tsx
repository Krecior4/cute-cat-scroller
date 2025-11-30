import { useEffect, useState, useRef } from "react"
import './CatScroller.css'
import cuteSound from '../public/assets/cute.wav';
import mehSound from '../public/assets/meh.wav'


export default function CatScroller() {
    const [url, setUrl] = useState<string>()
    const [clicked, setClicked] = useState<boolean>()
    const meh = useRef(new Audio(mehSound))
    const cute = useRef(new Audio(cuteSound))

    const reloadCat = async () => {
        const response = await fetch("https://cataas.com/cat")
        const result = await response.blob()
        const internalUrl = URL.createObjectURL(result)
        await setUrl(internalUrl)
        await setClicked(false)
    }

    useEffect(() => {
        const load = async () => {
            reloadCat()
        }
        load()
    }, [])

    return (
        <>
            <h1>Let's watch some cute cats!</h1>
            <div id="content-wrapper">
                <img id="img" src={url} alt="Cute cat" />
                <div id="controllers">
                    <button onClick={() => {
                        meh.current.play()
                        setClicked(true)
                        setTimeout(() => {
                            reloadCat()
                        }, 800)
                    }} disabled={clicked}>Meh</button>
                    <button onClick={() => {
                        cute.current.play()
                        setClicked(true)
                        setTimeout(() => {
                            reloadCat()
                        }, 800)
                    }} disabled={clicked}>Cute!</button>
                </div>
            </div>
        </>
    )
}