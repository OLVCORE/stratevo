import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa'

export default function SocialButton({ provider, onClick }: { provider: 'google' | 'facebook' | 'linkedin', onClick: () => void }) {
  const icons = {
    google: <FaGoogle className="text-red-500" />,
    facebook: <FaFacebook className="text-blue-600" />,
    linkedin: <FaLinkedin className="text-blue-700" />,
  }
  return (
    <button
      type="button"
      className="btn btn-outline flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-accent)]"
      onClick={onClick}
      aria-label={`Entrar com ${provider}`}
    >
      {icons[provider]}
    </button>
  )
} 