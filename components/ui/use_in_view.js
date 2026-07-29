"use client"

import { useState, useEffect, useRef } from "react"

export function useInView(options) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const target = ref.current // ✅ Save to local variable
        if (!target) return

        const observer = new IntersectionObserver(([entry]) => {
            setInView(entry.isIntersecting)
        }, options)

        observer.observe(target)

        return () => {
            observer.unobserve(target) // ✅ Safe cleanup
        }
    }, [options])

    return [ref, inView]
}
