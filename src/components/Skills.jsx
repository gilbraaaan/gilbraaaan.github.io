export default function Skills() {
  const customIcons = {
    blender: <svg className="w-8 h-8 fill-white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.51 13.214c.046-.8.438-1.506 1.03-2.006a3.424 3.424 0 0 1 2.212-.79c.85 0 1.631.3 2.211.79.592.5.983 1.206 1.028 2.005.045.823-.285 1.586-.865 2.153a3.389 3.389 0 0 1-2.374.938 3.393 3.393 0 0 1-2.376-.938c-.58-.567-.91-1.33-.865-2.152M7.35 14.831c.006.314.106.922.256 1.398a7.372 7.372 0 0 0 1.593 2.757 8.227 8.227 0 0 0 2.787 2.001 8.947 8.947 0 0 0 3.66.76 8.964 8.964 0 0 0 3.657-.772 8.285 8.285 0 0 0 2.785-2.01 7.428 7.428 0 0 0 1.592-2.762 6.964 6.964 0 0 0 .25-3.074 7.123 7.123 0 0 0-1.016-2.779 7.764 7.764 0 0 0-1.852-2.043h.002L13.566 2.55l-.02-.015c-.492-.378-1.319-.376-1.86.002-.547.382-.609 1.015-.123 1.415l-.001.001 3.126 2.543-9.53.01h-.013c-.788.001-1.545.518-1.695 1.172-.154.665.38 1.217 1.2 1.22V8.9l4.83-.01-8.62 6.617-.034.025c-.813.622-1.075 1.658-.563 2.313.52.667 1.625.668 2.447.004L7.414 14s-.069.52-.063.831zm12.09 1.741c-.97.988-2.326 1.548-3.795 1.55-1.47.004-2.827-.552-3.797-1.538a4.51 4.51 0 0 1-1.036-1.622 4.282 4.282 0 0 1 .282-3.519 4.702 4.702 0 0 1 1.153-1.371c.942-.768 2.141-1.183 3.396-1.185 1.256-.002 2.455.41 3.398 1.175.48.391.87.854 1.152 1.367a4.28 4.28 0 0 1 .522 1.706 4.236 4.236 0 0 1-.239 1.811 4.54 4.54 0 0 1-1.035 1.626" /></svg>,
    unity: <svg className="w-8 h-8 fill-white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.9288 4.2939 3.7997 2.1929c.1366.077.1415.2905 0 .3675l-4.515 2.6076a.4192.4192 0 0 1-.4246 0L7.274 6.8543c-.139-.0745-.1415-.293 0-.3675l3.7972-2.193V0L1.3758 5.5977V16.793l3.7177-2.1456v-4.3858c-.0025-.1565.1813-.2682.318-.1838l4.5148 2.6076a.4252.4252 0 0 1 .2136.3676v5.2127c.0025.1565-.1813.2682-.3179.1838l-3.7996-2.1929-3.7178 2.1457L12 24l9.6954-5.5977-3.7178-2.1457-3.7996 2.1929c-.1341.082-.3229-.0248-.3179-.1838V13.053c0-.1565.087-.2956.2136-.3676l4.5149-2.6076c.134-.082.3228.0224.3179.1838v4.3858l3.7177 2.1456V5.5977L12.9288 0Z" /></svg>,
    csharp: <svg className="w-8 h-8 fill-white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.194 7.543v8.913c0 1.103.588 2.122 1.544 2.674l7.718 4.456a3.086 3.086 0 0 0 3.088 0l7.718-4.456a3.087 3.087 0 0 0 1.544-2.674V7.543a3.084 3.084 0 0 0-1.544-2.673L13.544.414a3.086 3.086 0 0 0-3.088 0L2.738 4.87a3.085 3.085 0 0 0-1.544 2.673Zm5.403 2.914v3.087a.77.77 0 0 0 .772.772.773.773 0 0 0 .772-.772.773.773 0 0 1 1.317-.546.775.775 0 0 1 .226.546 2.314 2.314 0 1 1-4.631 0v-3.087c0-.615.244-1.203.679-1.637a2.312 2.312 0 0 1 3.274 0c.434.434.678 1.023.678 1.637a.769.769 0 0 1-.226.545.767.767 0 0 1-1.091 0 .77.77 0 0 1-.226-.545.77.77 0 0 0-.772-.772.771.771 0 0 0-.772.772Zm12.35 3.087a.77.77 0 0 1-.772.772h-.772v.772a.773.773 0 0 1-1.544 0v-.772h-1.544v.772a.773.773 0 0 1-1.317.546.775.775 0 0 1-.226-.546v-.772H12a.771.771 0 1 1 0-1.544h.772v-1.543H12a.77.77 0 1 1 0-1.544h.772v-.772a.773.773 0 0 1 1.317-.546.775.775 0 0 1 .226.546v.772h1.544v-.772a.773.773 0 0 1 1.544 0v.772h.772a.772.772 0 0 1 0 1.544h-.772v1.543h.772a.776.776 0 0 1 .772.772Zm-3.088-2.315h-1.544v1.543h1.544v-1.543Z" /></svg>,
    computer: <svg
      className="w-8 h-8 fill-white"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H8V20H16V18H20C21.1046 18 22 17.1046 22 16V6C22 4.89543 21.1046 4 20 4Z" />
      <path d="M4 6H20V14H4V6Z" />
      <rect x="8" y="19" width="8" height="1" rx="0.5" />
      <circle cx="12" cy="9" r="1" fill="#111827" />
    </svg>
  };

  const skills = [
    { name: "C#", val: 90, class: "is-success", icon: customIcons.csharp },
    { name: "Unity", val: 85, class: "is-success", icon: customIcons.unity },
    { name: "Blender", val: 80, class: "is-warning", icon: customIcons.blender },
    { name: "UI/UX", val: 75, class: "is-warning", icon: customIcons.computer },
    { name: "Web (HTML/CSS)", val: 45, class: "is-primary", icon: customIcons.computer },
    { name: "Adobe Family", val: 65, class: "is-primary", icon: customIcons.computer },
  ];

  return (
    <section className="scroll-mt-20" id="skills">
      <div className="nes-container with-title is-dark">
        <p className="title text-yellow-500 bg-black px-2">Character Attributes</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col gap-2 relative group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-between items-end">
                <span className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    {skill.icon ? skill.icon : <i className="nes-icon star is-small"></i>}
                  </div>
                  <h3 className="text-sm font-bold tracking-wider">{skill.name}</h3>
                </span>
                <span className="text-xs text-gray-400">Lv. {Math.floor(skill.val / 2)}</span>
              </div>
              <progress className={`nes-progress ${skill.class} w-full h-4 sm:h-6 p-px bg-[#121212] border-2 border-gray-600 border-solid`} value={skill.val} max="100"></progress>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
