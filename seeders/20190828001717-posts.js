"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", [
      {
        id: 1,
        header: "orem ipsum dolo",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum mauris augue, vitae viverra sem egestas eget. In hac habitasse platea dictumst. In vel augue a velit iaculis efficitur in in lorem. Pellentesque elementum suscipit neque, sed fringilla sapien malesuada in. Duis ut risus ullamcorper, feugiat tortor non, tempus massa. Morbi eleifend ipsum tellus, eget fringilla lorem consequat a. Nulla in justo rutrum nulla porta fringilla. Nulla facilisi. Proin ultrices sodales risus non congue. Vivamus pretium pharetra sem, vitae accumsan est pretium eget. Maecenas hendrerit euismod tellus. Nullam finibus sit amet odio malesuada sagittis. Mauris pretium sagittis pulvinar. Aliquam erat volutpat.",
        score: 7,
        update: "Thank you",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        header: "platea dictumst",
        body:
          "Curabitur a lacus metus. Sed imperdiet quis purus eget pharetra. Proin venenatis luctus risus vitae elementum. Praesent urna est, suscipit id tortor sagittis, maximus ullamcorper nisi. Proin porttitor turpis eu vehicula bibendum. Duis vehicula leo ac arcu tempor, at dapibus diam congue. In malesuada aliquet ipsum ut tempor. Sed vestibulum nec nisi non commodo. Aenean rhoncus aliquet nisl.",
        score: -4,
        update: "",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        header: "venenatis luctus",
        body:
          "Fusce ultrices consectetur tortor. Vivamus ut blandit lacus, sed tincidunt dui. Donec ac libero id tellus aliquet tempus. Quisque congue ligula enim, vitae eleifend purus euismod quis. Etiam at justo purus. In consequat lectus id venenatis pretium. Integer sit amet tempus justo. Phasellus semper urna sed nunc pulvinar euismod. Nullam bibendum lectus nec neque facilisis posuere. Mauris at velit vel risus suscipit tempus. Mauris sit amet pharetra ipsum, ultricies porttitor sem. Integer ante nulla, maximus gravida augue ut, commodo cursus diam. Proin purus ante, sollicitudin facilisis est sed, elementum dictum ipsum. Sed auctor venenatis nulla a aliquam. Proin nec sem in ex sodales dignissim.",
        score: 6,
        update: "",
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        header: "Donec ac libero",
        body:
          "Nullam viverra augue at pharetra gravida. In ligula ipsum, laoreet eu tincidunt ac, laoreet at dolor. Cras cursus, neque sed semper pretium, ipsum urna posuere leo, vel placerat felis tortor vel lacus. Sed fringilla gravida aliquam. Quisque ex sem, placerat ut nisl tincidunt, vehicula porta massa. Integer scelerisque luctus purus in aliquam. Proin massa arcu, pretium ut magna quis, dictum porttitor risus. Praesent eu nisi risus. Suspendisse faucibus molestie semper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec leo nulla, cursus nec dolor vel, congue pellentesque nibh. Praesent fringilla, massa ac pretium pellentesque, tortor augue volutpat neque, aliquet rutrum augue nisl a arcu. Praesent in sodales diam. Nullam orci nulla, pellentesque eget lorem vitae, molestie accumsan turpis. Phasellus non arcu urna. Suspendisse condimentum euismod ligula id aliquet.",
        score: 12,
        update: "",
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        header: "neque facilisis",
        body:
          "Aliquam pharetra ligula erat, in pulvinar eros dapibus quis. Nam tincidunt, nisi in gravida sollicitudin, magna velit maximus lectus, sit amet condimentum neque massa at ex. In sodales iaculis ipsum, faucibus tristique mauris cursus non. Nam nec luctus dui, efficitur venenatis dui. Curabitur ac semper nisi, quis consequat arcu. Etiam non tempus felis. Vestibulum auctor ultricies tellus, eget mollis dui porta ut. Cras accumsan nunc vel lacus faucibus sollicitudin tempus sit amet ex. Nunc mattis malesuada odio eu egestas. Sed condimentum libero quam, ac lobortis lectus semper vel. Aenean volutpat leo ipsum, quis fermentum ipsum finibus eu. Donec eleifend purus ac magna ultrices, quis tempor purus pretium. Proin condimentum nibh non sodales pretium. Aenean luctus risus non metus fringilla consequat. Maecenas id rhoncus nisl.",
        score: 3,
        update: "Yes this is true",
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        header: "venenatis luctus",
        body:
          "Donec convallis iaculis felis, ut varius felis varius at. Morbi pellentesque, arcu sit amet pellentesque placerat, sapien lacus viverra turpis, ut egestas ipsum mauris eget mauris. Proin porta placerat tincidunt. Mauris lacinia, dolor sit amet suscipit euismod, metus erat feugiat erat, eget vulputate justo risus a elit. Proin dignissim mauris eu nulla tincidunt, a hendrerit tellus dapibus. Duis non libero quis nunc imperdiet fermentum. Sed viverra sapien urna, sed porta leo faucibus eget. Nulla euismod malesuada urna, in ultrices sapien semper vitae. Nulla ipsum nunc, elementum sed diam eget, scelerisque suscipit nisl.",
        score: 7,
        update: "",
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        header: "itae eleifend",
        body:
          "Vestibulum non est in urna scelerisque fringilla et eget orci. Mauris bibendum ac sapien eu blandit. Suspendisse maximus efficitur placerat. Sed imperdiet nisl ultricies ligula venenatis molestie vel a neque. Morbi quis mauris orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque consectetur diam tellus, sed bibendum odio pretium at. Quisque tempor, nisl lacinia vehicula euismod, mauris odio facilisis sem, id consequat nulla ipsum ut elit",
        score: 3,
        update: "",
        userId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        header: "Donec ac libero id",
        body:
          "Aliquam erat volutpat. Praesent vel ipsum eget ipsum porta rutrum. Mauris bibendum leo dolor, eu fringilla lorem fermentum eget. Nullam dui nulla, elementum at mauris sit amet, venenatis auctor ante. Donec in ornare nisi. Fusce vitae nibh eget metus egestas tincidunt. Integer sollicitudin nunc fermentum, pharetra lectus ullamcorper, pellentesque est. Vestibulum dignissim, odio ac fringilla congue, justo sapien semper sem, eu sagittis enim enim sit amet nisi. Etiam ac accumsan nibh. Quisque tincidunt, lacus vitae ornare euismod, neque massa luctus ipsum, at eleifend dui est ut felis. Suspendisse vitae tortor facilisis, facilisis erat sit amet, molestie ante.",
        score: 6,
        update: "",
        userId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        header: "venenatis luctus",
        body:
          "Sed cursus dui sit amet molestie molestie. Vivamus ipsum leo, viverra eu ornare eget, ullamcorper vel mi. Fusce porta condimentum urna, in consectetur ligula varius nec. Sed iaculis fringilla sem, eu eleifend nibh rhoncus eu. Suspendisse ac magna sed magna rutrum varius. Duis dapibus nisl mauris, eu faucibus ante viverra ac. Cras fringilla elit ut facilisis maximus. Proin accumsan nisl ac pellentesque congue. Ut consectetur turpis a fermentum ullamcorper. Aliquam risus diam, sagittis vitae turpis eu, laoreet sagittis ex. Praesent gravida sodales lorem, id egestas turpis. Quisque fermentum mauris non congue tempus. Nunc id scelerisque nulla. Etiam scelerisque, odio faucibus maximus lacinia, neque urna vehicula metus, ut tristique arcu risus eu leo.",
        score: 21,
        update: "Praesent gravida sodales lorem, id egesta",
        userId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        header: "venenatis luctus",
        body:
          "Sed condimentum pulvinar erat a consequat. Pellentesque vehicula faucibus magna vel mollis. Vestibulum eu velit sit amet nulla fringilla lobortis ut quis velit. Aliquam eget elit sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas faucibus venenatis nisl, non finibus massa bibendum ac. Nunc at dignissim elit. Duis ornare iaculis mattis. Aenean porttitor imperdiet sodales. Morbi finibus eget sem ac venenatis. Praesent elementum orci faucibus, sagittis ligula vitae, sodales ipsum. Vestibulum dapibus placerat turpis, sed elementum diam semper sit amet. Sed sem felis, aliquet et eros eget, pellentesque mattis nisi. Duis lacinia, purus quis vehicula sagittis, metus est facilisis sem, a elementum mi nisi a enim. Proin eu leo at ex laoreet faucibus. Cras ac suscipit tellus.",
        score: 8,
        update: "",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        header: "consequat lectus",
        body:
          "Fusce ultrices consectetur tortor. Vivamus ut blandit lacus, sed tincidunt dui. Donec ac libero id tellus aliquet tempus. Quisque congue ligula enim, vitae eleifend purus euismod quis. Etiam at justo purus. In consequat lectus id venenatis pretium. Integer sit amet tempus justo. Phasellus semper urna sed nunc pulvinar euismod. Nullam bibendum lectus nec neque facilisis posuere. Mauris at velit vel risus suscipit tempus. Mauris sit amet pharetra ipsum, ultricies porttitor sem. Integer ante nulla, maximus gravida augue ut, commodo cursus diam. Proin purus ante, sollicitudin facilisis est sed, elementum dictum ipsum. Sed auctor venenatis nulla a aliquam. Proin nec sem in ex sodales dignissim.",
        score: 6,
        update: "",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        header: "venenatis luctus",
        body:
          "In vulputate felis turpis, quis mattis felis placerat malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer vel nisi ligula. In sed auctor arcu. Quisque nec risus ac odio auctor tempor. Duis pharetra posuere risus nec tempus. Aliquam bibendum, justo ac porta tempor, nisl erat vulputate elit, ultrices pulvinar leo erat id velit. Sed scelerisque lectus eu orci sodales feugiat. Integer et massa felis. Curabitur vitae auctor lacus. Phasellus euismod ornare nisl, et convallis lacus mattis in. Suspendisse feugiat lacinia magna.",
        score: 11,
        update: "",
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        header: "venenatis luctus",
        body:
          "Mauris ut ipsum justo. Aliquam sed tortor a turpis euismod euismod. Duis vitae rhoncus sem. Proin malesuada nunc non leo placerat, ut egestas nibh condimentum. Nullam convallis varius cursus. Ut lectus felis, suscipit id elementum varius, tristique non purus. Nulla pulvinar est lorem, vitae tempus massa porttitor at. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris ligula tortor, gravida ut lectus et, pellentesque auctor massa. Donec vel neque vel nibh finibus egestas. Integer a iaculis sem. Aenean a purus vitae odio mattis placerat. Maecenas vitae consectetur neque.",
        score: 16,
        update: "",
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        header: "condimentum",
        body:
          "Aliquam lacinia odio quam. Nam posuere semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur dui dui, egestas id ultricies pellentesque, bibendum a urna. Praesent cursus sapien et faucibus efficitur. Donec vitae augue odio. Fusce a vehicula erat, sed egestas lacus. In hac habitasse platea dictumst. Sed sagittis mauris quis accumsan vulputate. Ut mi quam, convallis aliquet elit ut, sodales porta arcu. Morbi vitae augue vitae orci malesuada pharetra. Proin velit dolor, dictum ac nisi sit amet, semper porta lacus. Nulla enim dui, tincidunt eu lacinia eu, facilisis quis justo. Suspendisse interdum justo at neque hendrerit interdum.",
        score: 5,
        update: "pellentesque auctor mass",
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        header: "tristique non purus",
        body:
          "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quis euismod ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec est justo, semper in luctus vitae, blandit vel quam. Nulla ultrices nibh nunc, nec consectetur nisl cursus vel. Duis tempor nibh eget nunc malesuada pulvinar. Nulla vitae sapien libero. Suspendisse potenti.",
        score: 12,
        update: "consectetur nisl",
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        header: "venenatis luctus",
        body:
          "Sed in sem ac nunc posuere viverra eleifend et tellus. Donec pulvinar facilisis lacinia. Morbi tincidunt urna quis est vulputate, vitae semper magna egestas. Vivamus ante mi, tristique in felis eget, porta porttitor lorem. Phasellus euismod at justo eu convallis. Vivamus dapibus feugiat elementum. Ut dignissim eu risus vitae eleifend. Maecenas id eleifend quam. Aliquam non risus vel dui vestibulum sodales id at tellus. Ut interdum et risus in placerat. Curabitur tempus est lacus, ac pellentesque metus bibendum in.",
        score: 6,
        update: "",
        userId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        header: "nulla rutrum eu",
        body:
          "Suspendisse ligula dui, cursus at massa eget, faucibus rutrum orci. Cras congue tincidunt pellentesque. Praesent pellentesque laoreet orci ac ultrices. Maecenas convallis tristique velit eget consectetur. Pellentesque laoreet ac massa eget lacinia. Aliquam sodales interdum sapien, ac posuere nulla rutrum eu. Sed hendrerit congue quam vel convallis. Fusce non elementum ipsum. Ut congue dictum neque, sit amet varius sapien elementum vel. Praesent purus eros, aliquam non ex in, sagittis cursus orci. Praesent posuere, mauris viverra scelerisque semper, leo libero rhoncus mauris, nec tincidunt turpis urna sed mi. Proin vel velit tellus. Nulla viverra fringilla posuere. Donec posuere massa congue sagittis vehicula. Integer at feugiat ante.",
        score: 3,
        update: "",
        userId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        header: "augue vitae",
        body:
          "Cras a augue vitae risus tristique commodo. Aenean vitae tincidunt eros. Nunc ante massa, elementum sit amet porttitor in, congue nec lacus. Nulla nec elit accumsan quam dignissim fermentum in non velit. Fusce odio mauris, sollicitudin id malesuada ut, rutrum ut purus. Duis vestibulum ultrices velit in accumsan. Integer nec elit non felis volutpat lobortis in id purus. Proin vulputate ac dui quis ornare. Sed nec lacinia tortor, a placerat arcu. Praesent volutpat, ligula at consectetur maximus, felis purus laoreet est, et varius leo massa eu ligula. In neque arcu, dictum in tempus nec, rutrum vitae sem.",
        score: 15,
        update:
          "quam dignissim fermentum in non velit. Fusce odio mauris, sollicitudin id malesuada ut, rutrum ut purus.",
        userId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  }
};
