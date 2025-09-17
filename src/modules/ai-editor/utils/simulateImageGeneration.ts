export interface SimulationResponse {
  success: boolean;
  outputs?: Array<{ data: string }>;
}

export const simulateImageGeneration = (
  prompt: string,
  imageBase64: string | null,
): Promise<SimulationResponse> => {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        let backgroundColor = '#4CAF50';
        let textColor = 'white';

        const promptLower = prompt.toLowerCase();
        if (
          promptLower.includes('red') ||
          promptLower.includes('fire') ||
          promptLower.includes('hot')
        ) {
          backgroundColor = '#F44336';
        } else if (
          promptLower.includes('blue') ||
          promptLower.includes('ocean') ||
          promptLower.includes('sky')
        ) {
          backgroundColor = '#2196F3';
        } else if (
          promptLower.includes('yellow') ||
          promptLower.includes('sun') ||
          promptLower.includes('gold')
        ) {
          backgroundColor = '#FFEB3B';
          textColor = 'black';
        } else if (
          promptLower.includes('purple') ||
          promptLower.includes('magic') ||
          promptLower.includes('mystical')
        ) {
          backgroundColor = '#9C27B0';
        } else if (
          promptLower.includes('dark') ||
          promptLower.includes('night') ||
          promptLower.includes('black')
        ) {
          backgroundColor = '#212121';
        }

        if (!ctx) return;
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, 512, 512);

        const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
        gradient.addColorStop(0, 'rgba(255,255,255,0.2)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);

        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        if (promptLower.includes('circle') || promptLower.includes('round')) {
          ctx.beginPath();
          ctx.arc(256, 256, 100, 0, 2 * Math.PI);
          ctx.fill();
        } else if (promptLower.includes('square') || promptLower.includes('box')) {
          ctx.fillRect(156, 156, 200, 200);
        } else {
          ctx.beginPath();
          ctx.moveTo(256, 156);
          ctx.lineTo(356, 356);
          ctx.lineTo(156, 356);
          ctx.closePath();
          ctx.fill();
        }

        ctx.fillStyle = textColor;
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('AI Generated', 256, 450);
        ctx.font = '16px Arial';
        ctx.fillText('Based on: ' + prompt.substring(0, 30) + '...', 256, 480);

        const generatedImageData = canvas.toDataURL('image/png').split(',')[1];

        resolve({
          success: true,
          outputs: [
            {
              data: generatedImageData,
            },
          ],
        });
      },
      2000 + Math.random() * 2000,
    );
  });
};
