import { FileUpload } from '../../components/ui/FileUpload'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function FileUploadShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Dropzone">
        <div className="w-full max-w-md">
          <FileUpload />
        </div>
      </ShowcaseRow>
      <ShowcaseRow label="Images only">
        <div className="w-full max-w-md">
          <FileUpload hint="PNG, JPG, SVG (5MBまで)" />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
