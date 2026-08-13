import type { Metadata } from "next";
import { CandidateForm } from "@/components/candidate-form";

export const metadata: Metadata = { title: "Área do candidato", description: "Cadastre seu currículo no banco de talentos da Selecta." };
export default function CandidatesPage() { 
    return 
    <main id="conteudo" className="page-main">
        <section className="page-hero">
            <div className="container">
                <p className="eyebrow">Banco de talentos</p>
                <h1>Mostre seu potencial para a oportunidade certa.</h1>
                <p>Cadastre seu currículo uma vez e permita que a Selecta considere seu perfil em processos seletivos compatíveis.</p>
                </div>
                </section>
    <section className="section">
        <div className="container contact-grid">
            <div className="contact-card">
                <p className="eyebrow">Antes de enviar</p>
                <h2>Alguns cuidados simples fazem diferença.</h2>
        <div className="contact-list">
            <div className="contact-item">
                <b>1</b>
                    <span>Mantenha telefone e e-mail atualizados.</span>
            </div>
        <div className="contact-item">
            <b>2</b>
                <span>Informe experiências e cursos relevantes.</span>
        </div>
        <div className="contact-item">
            <b>3</b>
            <span>Envie um arquivo legível e sem dados desnecessários.</span>
        </div>
        </div>
        </div>
        <CandidateForm />
        </div>
        </section>
        </main>; 
        }
