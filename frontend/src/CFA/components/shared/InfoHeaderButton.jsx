import React from 'react'
import { Call, Mail } from '../../assets/customSvg'

function InfoHeaderButton() {
    return (
        <div className=" use-border rounded-full h-[62px] px-5 py-2.5 flex items-center gap-2 color-primary-background">
            <Call className="w-4 h-4 text-[var(--text-yellow)]" />
            <span className="text-sm font-medium color-text-base ]">{"(918) 555-0123"}</span>
            <Mail className="w-4 h-4 text-[var(--text-yellow)]" />
            <span className="text-sm font-medium color-text-base">{"info@cfa.com"}</span>
        </div>
    )
}

export default InfoHeaderButton