import { Editor } from "./editor"
import { ToolBar } from './toolbar'
import { Navbar } from "./navbar"
import { Room } from "./room"


interface DocumentIdProps {
  params: { documentId: String }
};
const DocumentIdPage = async ({ params }: DocumentIdProps) => {
  const { documentId } = await params;
  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
          <Navbar />
          <ToolBar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor />
        </div>
      </div>
    </Room>
  )
}
export default DocumentIdPage;
