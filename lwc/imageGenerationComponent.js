import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ImageGenerationComponent extends LightningElement {
    prompt = '';
    imageUrl = '';
    isLoading = false;
    handlePromptChange(event) {
        this.prompt = event.target.value;
    }
    handleGenerateImage() {
        if (!this.prompt) {
            const event = new ShowToastEvent({
                title: 'Error',
                message: 'Please enter a valid prompt.',
                variant: 'error',
            });
            this.dispatchEvent(event);
            return;
        }
        this.isLoading = true;
        const apiKey = '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';
        const model = 'image-alpha-001';
        const url = `https://api.openai.com/v1/images/generations`;

        const options = {
            method: 'POST',
            body: JSON.stringify({ prompt: this.prompt, model: model }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log('Data: '+JSON.stringify(data));
                this.imageUrl = data.data[0].url;
                this.isLoading = false;
            })
            .catch(error => {
                console.log(error);
                this.isLoading = false;
            });
    }
}
