import WhatsappIcon from "../icons/whatsapp";

export default function WhatsappPlugin() {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://api.whatsapp.com/send?phone=628115532323"
    >
      <div className="bg-[#25d366] rounded-full w-[60px] h-[60px] fixed bottom-10 right-10 flex items-center justify-center">
        <WhatsappIcon className="w-10 h-10 text-white hover:text-blue-800" />
      </div>
    </a>
  );
}
