export interface SaveResponse {
  success: boolean;
  message: string;
}

export const simulateImageSave = (): Promise<SaveResponse> => {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve({
          success: true,
          message: 'Image saved successfully!',
        });
      },
      1000 + Math.random() * 1000,
    );
  });
};
