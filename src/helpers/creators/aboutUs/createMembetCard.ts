export function MemberCardCreator(name: string, srcPhoto: string, role: string, bio: string, git: string) {
  const card = document.createElement("div");
  card.classList.add("member_card_wraper");

  const MemberPhoto = document.createElement("img");
  MemberPhoto.classList.add("member_photo");
  MemberPhoto.alt = `${name} photo`;
  MemberPhoto.src = srcPhoto;

  const MemberDescriptionWraper = document.createElement("div");
  const MemberName = document.createElement("div");
  MemberName.innerHTML = `<b>Name</b>:   ${name}`;
  const MemberRole = document.createElement("div");
  MemberRole.innerHTML = `<b>Role</b>:   ${role}`;
  const MemberBio = document.createElement("div");
  MemberBio.innerHTML = `<b>Short bio</b>:   ${bio}`;
  const MemberGit = document.createElement("div");
  MemberGit.innerHTML = `<b>Git</b>:  `;
  const gitLink = document.createElement("a");
  gitLink.classList.add("about_git_link");
  gitLink.href = git;
  gitLink.innerHTML = `${gitLink}`;
  MemberGit.append(gitLink);

  MemberDescriptionWraper.append(MemberName, MemberRole, MemberBio, MemberGit);
  card.append(MemberPhoto, MemberDescriptionWraper);
  return card;
}
