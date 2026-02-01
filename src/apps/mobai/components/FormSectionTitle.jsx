import { Gamepad2 } from "lucide-react"

const FormSectionTitle = ({ title, icon: Icon = Gamepad2 }) => {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div
                className="w-12 h-12 bg-gradient-to-b from-red-600/60 to-red-600 rounded-full shadow-[0px_10px_45px_0px_rgba(255,0,6,0.50)] outline-1 outline-offset-[-1px] outline-white/60 flex justify-center items-center transition-transform duration-200 hover:-translate-y-1"
            >
                <Icon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
    )
}

export default FormSectionTitle
