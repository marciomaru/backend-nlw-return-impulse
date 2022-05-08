/*
spies = são métodos que verificam se as funções foram chamadas
*/
const createFeedbackSpy = jest.fn();//jest.fn() é uma função espiã
const sendMailSpy = jest.fn();//jest.fn() é uma função espiã

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    /*{ create: async () => { } },
    { sendMail: async () => { } }
    versão anter de usar as funções espiãs
    */

    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }


)



//'describe' cria uma "categoria" para inserir vários testes 
//para essa categoria
import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {

        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,dfasdfadfafadfad',
        })).resolves.not.toThrow();

        //verifica se as funções espiãs foram chamadas
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();

    });

    it('should not be able to submit feedback without type', async () => {

        await expect(submitFeedbackUseCase.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,dfasdfadfafadfad',
        })).rejects.toThrowError();

    });

    it('should not be able to submit feedback without comment', async () => {

        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,dfasdfadfafadfad',
        })).rejects.toThrowError();

    });

    it('should not be able to submit feedback with screeshot invalid format', async () => {

        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'invalid format',
        })).rejects.toThrow();

    });
})