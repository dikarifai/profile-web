import BlogAdminLayout from "@/components/Layouts/BlogAdminLayout"

const PortfolioAdminPage: React.FC = () => {
    return <BlogAdminLayout type="PORTFOLIO" endpoint="/portfolios" />
}

export default PortfolioAdminPage