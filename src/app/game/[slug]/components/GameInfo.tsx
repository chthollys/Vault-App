export default function GameInfo() {
  return (
    <div className="mb-8 flex flex-col border-b-[1px] border-solid border-b-white/10 pb-6 text-left">
      <h2 className="mx-0 mt-0 mb-3 text-[2.5rem] leading-[1.2] font-extrabold text-white/90">
        {"GAME NAME"}
      </h2>
      <p className="mx-0 mt-0 mb-2 text-[1.2rem] font-medium text-white/50">
        {"DEVELOPER NAME"}
      </p>
      <p className="text-primary m-0 inline-block w-fit rounded-[20px] border-[0.5px] border-solid border-[rgba(139,_92,_246,_0.3)] bg-[rgba(139,_92,_246,_0.15)] px-4 py-2 text-[0.9rem] font-semibold">
        {"CATEGORY NAME"}
      </p>
    </div>
  );
}
