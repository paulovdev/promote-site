import React, { useState, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import emailjs from 'emailjs-com';
import { AnimatePresence, motion } from 'framer-motion';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Firebase';
import { IoCloseOutline } from 'react-icons/io5';

import YourInfoStep from './YourInfoStep/YourInfoStep';
import CategoryStep from './CategoryStep/CategoryStep';
import ToolStep from './ToolStep/ToolStep';
import ImageStep from './ImageStep/ImageStep';
import PriceStep from './PriceStep/PriceStep';
import SiteLinksStep from './SiteLinksStep/SiteLinksStep';

import "./Create.scss";
import Price from '../../components/Price/Price';

const Create = () => {
  const [step, setStep] = useState(1);
  const [myName, setMyName] = useState('');
  const [email, setEmail] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [siteName, setSiteName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tool, setTool] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('500');
  const [livePreview, setLivePreview] = useState('');
  const [buyLink, setBuyLink] = useState('');
  const [contactLink, setContactLink] = useState('');
  const [isPhotoValid, setIsPhotoValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const imageRef = useRef();

  // Debounce the setStep function to prevent rapid clicking
  const debouncedSetStep = useCallback(
    debounce((newStep) => setStep(newStep), 300), // 300ms delay
    []
  );

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setIsPhotoValid(true);
    } else {
      setIsPhotoValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setIsPhotoValid(false);
      return;
    }

    setIsLoading(true);

    try {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      const templateParams = {
        from_name: myName,
        to_name: 'Paulo Vitor',
        profileLink: profileLink,
        email: email,
        category: category,
        tool: tool,
        siteName: siteName,
        description: description,
        sitePrice: price === 0 ? 'Free' : `$${price}`,
        livePreview: livePreview,
        buyLink: buyLink,
        contactLink: contactLink,
        imageURL: imageUrl,
      };

      await emailjs.send('service_rn6tzel', 'template_ash6cza', templateParams, '0j6AC4QElZ7rF8zIB');
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('EmailJS Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepProgress = () => (
    <div className="step-progress">
      <div className="progress-line"></div>
      <motion.div
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: `${step * 16.6}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </div>
  );

  const renderStep = () => (
    <AnimatePresence mode='wait'>
      <motion.section
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.3 }}
        className='animate-render-step-wrapper'
      >
        <form>
          {(() => {
            switch (step) {
              case 1:
                return <YourInfoStep myName={myName} setMyName={setMyName} email={email} setEmail={setEmail} profileLink={profileLink} setProfileLink={setProfileLink} siteName={siteName} setSiteName={setSiteName} description={description} setDescription={setDescription} setStep={debouncedSetStep} />;
              case 2:
                return <CategoryStep category={category} setCategory={setCategory} setStep={debouncedSetStep} />;
              case 3:
                return <ToolStep tool={tool} setTool={setTool} setStep={debouncedSetStep} />;
              case 4:
                return <ImageStep image={image} setImage={setImage} isPhotoValid={isPhotoValid} setIsPhotoValid={setIsPhotoValid} imageRef={imageRef} handleImageChange={handleImageChange} setStep={debouncedSetStep} />;
              case 5:
                return <PriceStep price={price} setPrice={setPrice} setStep={debouncedSetStep} />;
              case 6:
                return <SiteLinksStep livePreview={livePreview} setLivePreview={setLivePreview} buyLink={buyLink} setBuyLink={setBuyLink} contactLink={contactLink} setContactLink={setContactLink} setStep={debouncedSetStep} handleSubmit={handleSubmit} />;
              default:
                return null;
            }
          })()}
        </form>
      </motion.section>
    </AnimatePresence>
  );

  const stepContent = {
    1: { span: "1/6", h1: "Suas informações", p: "Forneça seu nome, e-mail, link de perfil, nome e descrição do seu site. Isso ajuda os usuários a entenderem sobre o que é o seu site." },
    2: { span: "2/6", h1: "Categoria", p: "Escolha a categoria que melhor se encaixa no seu site. Isso ajuda a organizar e encontrar seu site." },
    3: { span: "3/6", h1: "Ferramenta", p: "Selecione a ferramenta que você usou para criar o seu site." },
    4: { span: "4/6", h1: "Imagem", p: "Adicione uma imagem representativa do seu site." },
    5: { span: "5/6", h1: "Preço", p: "Defina o preço de venda do seu site." },
    6: { span: "6/6", h1: "Links do Site", p: "Forneça links adicionais para o seu site, como links de compra e contato." }
  };

  return (
    <div id="create">
      <div className="head-container">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
        >
          <div className="head">
            <h1>Pronto para publicar seu <span>template</span>?</h1>
            <p>
              Aproveite esta oportunidade para apresentar seu site no Quimplo. Ao enviar, você pode obter um público maior e até vender seu site para compradores interessados.
            </p>


            <Price onClick={() => setShowModal(true)} />
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="form-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="form-wrapper">
              <div className="left-content">

                <div className="step-info">
                  <span>{stepContent[step].span} </span>
                  <h1>{stepContent[step].h1} </h1>
                  <p>{stepContent[step].p}</p>
                </div>
                {renderStepProgress()}
              </div>

              <div className="right-content">
                {renderStep()}
              </div>
            </div>
            <button className="close-button" onClick={() => setShowModal(false)}>
              <IoCloseOutline size={35} />
            </button>
          </motion.div>

        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessModal && (
          <SuccessModal onClose={() => setShowSuccessModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
const SuccessModal = ({ onClose }) => (
  <motion.div
    className="modal-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    onClick={onClose}
  >
    <motion.div
      className="modal-content"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="close-btn" onClick={onClose}>
        <IoCloseOutline size={32} />
      </button>
      <h3>Formulário enviado com sucesso!</h3>
      <p>Observe que pode levar de 1 a 2 semanas para que revisemos sua submissão.</p>
    </motion.div>
  </motion.div>
);

export default Create;
