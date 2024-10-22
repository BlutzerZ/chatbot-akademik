import MessageBubble from "../components/MessageBubble";
import HistoryItem from "@/components/HistoryItem";
import InputFooter from "@/components/InputFooter";
import Head from "next/head";

const chatData = [
      {
            id:1,
            sender:'user',
            content:'Hai Bengky apa kabarnya?',
      },
      {
            id:2,
            sender:'bngky',
            content:'Oke-oke aja! Ada yang bisa aku bantu?',
      },
      {
            id:3,
            sender:'user',
            content:'Syarat untuk ambil TA itu apa aja?',
      },
      {
            id:4,
            sender:'bngky',
            content:'Syarat untuk ambil TA yaitu minimal kamu udah ambil 100 SKS, ya. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum omnis id earum! Doloribus rerum id explicabo nobis alias maiores, odio velit voluptate beatae quisquam totam odit numquam illum minus quaerat animi unde? Ad amet aspernatur ex suscipit fugit fugiat quia veritatis ullam tenetur dolore tempore, at ducimus est ea modi.',
      },
      {
            id:5,
            sender:'user',
            content:'Mekanisme untuk pendaftaran TA sendiri bagaimana?',
      },
      {
            id:6,
            sender:'bngky',
            content:'Kamu bisa mendaftar TA melalui situs berikut www.ta.dinus.ac.id. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum omnis id earum! Doloribus rerum id explicabo nobis alias maiores, odio velit voluptate beatae quisquam totam odit numquam illum minus quaerat animi unde? Ad amet aspernatur ex suscipit fugit fugiat quia veritatis ullam tenetur dolore tempore, at ducimus est ea modi.',
      },
      {
            id:7,
            sender:'user',
            content:'Baiklah terimakasih infonya bengky',
      },
      {
            id:8,
            sender:'bngky',
            content:'Sama-sama. Senang bisa membantu',
      },
      {
            id:9,
            sender:'user',
            content:'Syarat untuk ambil TA itu apa aja?',
      },
      {
            id:10,
            sender:'bngky',
            content:'Syarat untuk ambil TA yaitu minimal kamu udah ambil 100 SKS, ya. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum omnis id earum! Doloribus rerum id explicabo nobis alias maiores, odio velit voluptate beatae quisquam totam odit numquam illum minus quaerat animi unde? Ad amet aspernatur ex suscipit fugit fugiat quia veritatis ullam tenetur dolore tempore, at ducimus est ea modi.',
      },
      {
            id:11,
            sender:'user',
            content:'Baiklah terimakasih infonya bengky',
      },
      {
            id:12,
            sender:'bngky',
            content:'Sama-sama. Senang bisa membantu',
      },
]

const chatHistoryData = [
      {id:1, date:"7 Oktober 2024"},
      {id:2, date:"6 Oktober 2024"},
      {id:3, date:"1 Oktober 2024"},
      {id:4, date:"30 September 2024"},
      {id:5, date:"16 September 2024"},
      {id:6, date:"1 September 2024"}
]

export default function ConversationsViewsBrowser(){
      const chatMessages = chatData;
      const chatHistory = chatHistoryData;
      // SIDEBAR_WIDTH = 80;
      // SIDEBAR_FOOTER_HEIGHT = 32;
      // HEADER_HEIGHT = 24;
      // FOOTER_HEIGHT = 36;

      return (
            <>
                  <div className="flex h-screen">

                        {/* Left/Sidebar */}
                        <div className="flex flex-col fixed left-0 h-screen w-80 bg-tertiary-100">
                              {/* Sidebar header */}
                              <div className="w-full">
                                    <div className="flex h-24 shadow-lg items-center justify-between gap-2 text-tertiary-900 px-5">
                                          <div className="flex gap-2">
                                                <span className="material-symbols-rounded">
                                                history
                                                </span>
                                                <h1 className="text-2xl font-bold">Riwayat</h1>
                                          </div>
                                          <button className="px-2 material-icons hover:bg-white">
                                                <span className="material-symbols-rounded">
                                                edit_square
                                                </span>
                                          </button>
                                    </div>
                              </div>

                              {/* Sidebar contents */}
                              <div className={`bg-tertiary-100 flex-1 mb-32 px-5 py-2 overflow-y-scroll`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                    <div className="space-y-2">
                                          {chatHistory.map(history => (
                                                <HistoryItem key={history.id} history={history} />
                                          ))}
                                    </div>
                              </div>

                              {/* Sidebar footer */}
                              <div className="fixed bottom-0 h-32 w-80">
                                    <p>lorem ipsum</p>
                                    
                              </div>
                        </div>

                        {/* Right/Header/Contents */}
                        <div className="flex flex-col w-full bg-white ml-80">
                              
                              {/* Header */}
                              <div className={`fixed bg-white top-0 h-24 flex items-center w-full`}>
                                    <div className="flex items-center px-10 gap-5">
                                          <svg className="size-32" width="123" height="50" viewBox="0 0 192 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.8831 50.082C17.3134 50.082 15.1946 49.6086 13.5266 48.6619C11.8585 47.6701 10.5512 46.4754 9.60445 45.0779H9.06347V49H0.81351V0.582187H9.60445V13.3629L9.06347 18.5022H9.60445C10.3708 17.1948 11.6331 16.0227 13.3913 14.9858C15.1495 13.9489 17.3134 13.4305 19.8831 13.4305C22.7683 13.4305 25.3605 14.1518 27.6597 15.5944C30.004 16.9919 31.8523 19.0657 33.2048 21.8157C34.5572 24.5206 35.2334 27.8341 35.2334 31.7562C35.2334 35.6783 34.5572 39.0144 33.2048 41.7644C31.8523 44.4693 30.004 46.543 27.6597 47.9857C25.3605 49.3832 22.7683 50.082 19.8831 50.082ZM17.7192 41.832C20.1536 41.832 22.2048 40.9754 23.8728 39.2623C25.5859 37.5041 26.4425 35.0021 26.4425 31.7562C26.4425 28.5103 25.6085 26.0083 23.9405 24.2501C22.2724 22.4919 20.1987 21.6128 17.7192 21.6128C15.2848 21.6128 13.2335 22.4919 11.5655 24.2501C9.89748 26.0083 9.06347 28.5103 9.06347 31.7562C9.06347 35.0021 9.89748 37.5041 11.5655 39.2623C13.2335 40.9754 15.2848 41.832 17.7192 41.832ZM39.1291 49V14.5124H47.3791V18.7051H47.9201C48.9119 17.0821 50.3094 15.7973 52.1127 14.8506C53.916 13.9038 55.9221 13.4305 58.1311 13.4305C62.0983 13.4305 65.0962 14.6477 67.1249 17.0821C69.1987 19.4714 70.2355 22.8075 70.2355 27.0903V49H61.4446V28.3075C61.4446 26.1886 60.9262 24.5431 59.8893 23.371C58.8975 22.1989 57.4323 21.6128 55.4938 21.6128C53.961 21.6128 52.6086 22.0186 51.4365 22.83C50.3094 23.6415 49.4303 24.746 48.7992 26.1435C48.2131 27.496 47.9201 29.0288 47.9201 30.7419V49H39.1291ZM90.4283 64.6885C87.2726 64.6885 84.5677 64.1926 82.3136 63.2008C80.0595 62.209 78.2562 60.834 76.9038 59.0758C75.5964 57.3176 74.6948 55.2889 74.1989 52.9897L82.9898 51.2315C83.4857 52.8996 84.3197 54.252 85.4918 55.2889C86.7091 56.3709 88.3545 56.9118 90.4283 56.9118C92.9529 56.9118 94.9816 56.0102 96.5143 54.2069C98.0922 52.4488 98.8811 49.9467 98.8811 46.7008V44.2664H98.3402C97.1229 45.7992 95.7254 46.9262 94.1475 47.6475C92.6148 48.3689 90.6537 48.7295 88.2644 48.7295C85.6496 48.7295 83.2152 48.0307 80.9611 46.6332C78.7521 45.1906 76.9714 43.1619 75.6189 40.5472C74.2665 37.8873 73.5903 34.7316 73.5903 31.08C73.5903 27.4284 74.2665 24.2952 75.6189 21.6805C77.0165 19.0206 78.8197 16.9919 81.0288 15.5944C83.2828 14.1518 85.6947 13.4305 88.2644 13.4305C90.5185 13.4305 92.5021 13.8137 94.2152 14.5801C95.9283 15.3465 97.3033 16.4735 98.3402 17.9612H98.8811V14.5124H107.266V46.4303C107.266 50.1721 106.59 53.3955 105.238 56.1004C103.885 58.8504 101.947 60.9692 99.4221 62.4569C96.9426 63.9446 93.9447 64.6885 90.4283 64.6885ZM90.6312 40.6824C92.164 40.6824 93.5389 40.3218 94.7562 39.6005C96.0184 38.8341 97.0102 37.7521 97.7315 36.3546C98.4979 34.9119 98.8811 33.1538 98.8811 31.08C98.8811 28.9612 98.4979 27.203 97.7315 25.8054C96.9652 24.3628 95.9508 23.2809 94.6885 22.5595C93.4713 21.8382 92.1189 21.4776 90.6312 21.4776C89.1435 21.4776 87.7685 21.8382 86.5062 22.5595C85.289 23.2809 84.2972 24.3628 83.5308 25.8054C82.7644 27.203 82.3812 28.9612 82.3812 31.08C82.3812 33.1538 82.7419 34.9119 83.4632 36.3546C84.2296 37.7972 85.2439 38.8791 86.5062 39.6005C87.7685 40.3218 89.1435 40.6824 90.6312 40.6824ZM133.342 49L124.213 34.4611L120.359 38.3832V49H111.568V0.582187H120.359V26.6845H120.832L132.801 14.5124H143.621V15.0534L130.57 28.1722L143.08 48.459V49H133.342ZM151.642 64.1475C150.469 64.1475 149.342 64.0348 148.26 63.8094C147.178 63.584 146.277 63.3135 145.556 62.9979V54.4774C146.142 54.793 146.976 55.1311 148.058 55.4918C149.185 55.8975 150.334 56.1004 151.506 56.1004C152.949 56.1004 154.144 55.7172 155.09 54.9508C156.082 54.1844 157.006 52.8319 157.863 50.8934L159.351 47.6475L145.488 14.5124H155.293L163.746 36.2193H164.219L172.807 14.5124H182.545L165.504 54.4774C164.603 56.5963 163.588 58.377 162.461 59.8196C161.334 61.2622 159.914 62.3442 158.201 63.0655C156.488 63.7868 154.301 64.1475 151.642 64.1475ZM185.359 49.4057C183.601 49.4057 182.09 48.7971 180.828 47.5799C179.611 46.3176 179.002 44.8074 179.002 43.0492C179.002 41.291 179.611 39.8033 180.828 38.5861C182.09 37.3238 183.601 36.6927 185.359 36.6927C187.117 36.6927 188.605 37.3238 189.822 38.5861C191.084 39.8033 191.715 41.291 191.715 43.0492C191.715 44.8074 191.084 46.3176 189.822 47.5799C188.605 48.7971 187.117 49.4057 185.359 49.4057Z" fill="#1153A1"/>
                                          </svg>
                                    </div>
                              </div>

                              {/* Messages content */}
                              <div className="mt-24 pb-64 pt-24 px-80">
                                    <div className="space-y-3 h-fit">
                                          {chatMessages.map(message => (
                                                <MessageBubble key={message.id} message={message} />
                                          ))}
                                    </div>
                              </div>

                              {/* Footer */}
                              <InputFooter />
                        </div>

                  </div>
            </>
      );
}