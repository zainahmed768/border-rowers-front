import React from "react";
import Paragraph from "../../../../Paragraph";
import Image from "next/image";
import "./index.css";
import { useRouter } from "next/navigation";

const TeamCard = ({ teamLogo, teamName, total, members, slug, asCaptian }) => {
  const router = useRouter();

  return (
    <div
      className="team__card"
      onClick={() =>
        router.push(`/user/my-team/${asCaptian ? "as-captian" : slug}`)
      }
    >
      <div className="team__logo">
        <Image src={teamLogo} alt="Border Rowers" width={79} height={79} />
      </div>
      <div className="team__info">
        <h3 className="team__name">{teamName}</h3>
        <div className="totals">
          <div className="avatars">
            {members?.map((member) => (
              <Image
                src={member?.img}
                alt="Border Rowers"
                width={35}
                height={35}
                key={member?.id}
              />
            ))}
            <span>{total}+</span>
          </div>
          <Paragraph size text={`Total Members: ${total}`} />
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
