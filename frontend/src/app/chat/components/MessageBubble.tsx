import { MessageType } from "@/types/MessageType";
import Head from "next/head";
import useHoverIcon from "@/hooks/useHoverIcon";
import { useState } from "react";

export default function MessageBubble({message} : {message: MessageType}){
      const hoverIconLike = useHoverIcon();
      const hoverIconDislike = useHoverIcon();

      const { isHovered: isHoveredLike, handleMouseEnter: handleMouseEnterLike, handleMouseLeave: handleMouseLeaveLike } = hoverIconLike;
      const { isHovered: isHoveredDislike, handleMouseEnter: handleMouseEnterDislike, handleMouseLeave: handleMouseLeaveDislike } = hoverIconDislike;

      const [ isDisliked, setIsDisliked ] = useState(false);
      
      function handleDislike(){
            setIsDisliked(true);
            console.log(isDisliked);
      }

      return(
            <>
                  <div key={message.id} className={`flex gap-2 w-full ${message.sender != 'bngky' ? "justify-end":"justify-start"}`}>
                        {message.sender === 'bngky' && (
                              <span className="material-symbols-rounded text-primary-700 mt-2">
                              smart_toy
                              </span>
                        )}
                        <div className="">
                              <div className={`py-3 px-5 rounded-2xl ${message.sender != 'bngky' ? "bg-primary-700 text-white":"bg-primary-50 border border-1 border-primary-100 text-black"} h-fit w-auto max-w-96`}>
                                    <p>{message.content}</p>
                              </div>
                              {message.sender === 'bngky' && (
                                    <div className="flex gap-3 py-2 mr-2">
                                          <div className="has-tooltip">
                                                <button className="" onMouseEnter={handleMouseEnterLike} onMouseLeave={handleMouseLeaveLike}>
                                                      <span className="material-symbols-rounded material-icons-clickable" style={{
                                                                  fontVariationSettings: `'FILL' ${isHoveredLike ? 1 : 0}`
                                                            }}>
                                                            thumb_up
                                                      </span>
                                                </button>
                                                <span className="feedback-tooltip">
                                                      Saya menyukai respon ini
                                                </span>
                                          </div>
                                          <div className="has-tooltip">
                                                <button className="" onClick={handleDislike} onMouseEnter={handleMouseEnterDislike} onMouseLeave={handleMouseLeaveDislike}>
                                                      <span className="material-symbols-rounded material-icons-clickable" style={{
                                                                  fontVariationSettings: `'FILL' ${isHoveredDislike ? 1 : 0}`
                                                            }}>
                                                            thumb_down
                                                      </span>
                                                </button>
                                                <span className="feedback-tooltip">
                                                      Saya tidak menyukai respon ini
                                                </span>
                                          </div>
                                          <div className="has-tooltip">
                                                <button className="">
                                                      <span className="material-symbols-rounded material-icons-clickable" style={{
                                                                  fontVariationSettings: `'FILL' ${isHoveredDislike ? 1 : 0}`
                                                            }}>
                                                            refresh
                                                      </span>
                                                </button>
                                                <span className="feedback-tooltip">
                                                      Generate ulang respon
                                                </span>
                                          </div>

                                    </div>
                              )}
                        </div>
                  </div>
                  <div className={`${isDisliked ? "visible w-96 h-1/2 absolute bg-red-500":"invisible"} `}>
                        <h1 className="text-2xl font-bold">Dislike this?</h1>
                  </div>
            </>
      );
}