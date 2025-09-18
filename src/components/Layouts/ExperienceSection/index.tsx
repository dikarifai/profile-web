import ExperienceAccordion from "@/components/Fragments/ExperienceAccordion"
import Section from "@/components/Fragments/Section"

const experiences = [
    {
        id: "exp-1",
        company: "PT Tech Indonesia",
        role: "Frontend Developer",
        period: "Jan 2023 - Sekarang",
        description: "Mengembangkan aplikasi internal menggunakan React, Next.js, dan shadcn/ui. Fokus pada performance dan clean UI.",
    },
    {
        id: "exp-2",
        company: "Startup Kreatif",
        role: "Fullstack Developer",
        period: "Mei 2021 - Des 2022",
        description: "Membangun sistem absensi berbasis kamera dengan MERN stack. Mengintegrasikan API real-time menggunakan WebSocket.",
    },
    {
        id: "exp-3",
        company: "Freelance",
        role: "Web Developer",
        period: "2019 - 2021",
        description: "Mengerjakan berbagai proyek website untuk UKM. Stack yang sering digunakan: Laravel, Livewire, dan TailwindCSS.",
    },
]

const ExperienceSection: React.FC = () => {
    return <Section title="Experience">
        <ExperienceAccordion items={experiences} />
    </Section>
}

export default ExperienceSection