export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function convertDocumentsToBase64(documents: {
  aadhaarFront: File | null
  aadhaarBack: File | null
  panCard: File | null
  bankProof: File | null
  profilePhoto: File | null
}) {
  return {
    aadhaarFront: documents.aadhaarFront ? await fileToBase64(documents.aadhaarFront) : "",
    aadhaarBack: documents.aadhaarBack ? await fileToBase64(documents.aadhaarBack) : "",
    panCard: documents.panCard ? await fileToBase64(documents.panCard) : "",
    bankProof: documents.bankProof ? await fileToBase64(documents.bankProof) : "",
    profilePhoto: documents.profilePhoto ? await fileToBase64(documents.profilePhoto) : "",
  }
}
