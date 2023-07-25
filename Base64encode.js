// Change Profile Image === Working
const [selectedImage, setSelectedImage] = useState(null)

const handleImageChange = (event) => {
  const file = event.target.files[0]
  const reader = new FileReader()

  reader.onload = () => {
    const base64String = reader.result
    setSelectedImage(base64String)
  }
  if (file) {
    reader.readAsDataURL(file)
  }
}