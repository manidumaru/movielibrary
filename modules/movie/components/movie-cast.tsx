import { CastType } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@radix-ui/react-separator";

interface MovieCastProps {
  castData: CastType[];
}

export default function MovieCast({ castData }: MovieCastProps) {
  return (
    <ScrollArea className="h-32 md:h-[400px]">
      <div className="flex flex-wrap gap-8 justify-center md:justify-start">
        {castData.slice(0, 10).map((actor) => {
          return (
            <Avatar key={actor.cast_id} className="h-20 w-20 md:h-32 md:w-32">
              <Popover>
                <PopoverTrigger>
                  <AvatarImage
                    src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                    className="object-cover"
                  />
                  <AvatarFallback className="h-20 w-20 md:h-32 md:w-32">
                    NA
                  </AvatarFallback>
                </PopoverTrigger>
                <PopoverContent align="center" side="top" className="p-4">
                  <p className="text-2xl">{actor.name}</p>
                  <Separator />
                  <p className="text-md text-gray-400">{actor.character}</p>
                </PopoverContent>
              </Popover>
            </Avatar>
          );
        })}
      </div>
    </ScrollArea>
  );
}
