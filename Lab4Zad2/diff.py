# Made by Krzysztof Kołodziejski

data = ["33e8ff6a4741c574c3f2e37c5e3e7ce7",
    "21147292fe36a2fc79e5c396599a65dd",
    "da6fcc735edf40d268e0a16ed2773deeeb536409",
    "ec7b6454220084eaf07502e0fd867c9aa32fe8ea",
    "ef631ad66d82e0c24ee6a9862498261c139ce331f019fb2828d2fc91",
    "5a325b2ece0a7a6206155af6978b3e76902b14366f7403632c2b9a4a",
    "bc3bc0ead5575781ff15e49994e128023f8df1c95bacfe3048b8c5dd68eb2d45",
    "17649c7b90f9b8f52ba0d3967f5764f629fd30c280b6cf5533316a744c392a47",
    "4d563829f4c53edeec4af19501e32debc0aaf4e9a627439a5021695b14500019c66b0618a1175c4a160ba39b72959aa5",
    "6c21ba74c1fbde983279deec4d6f2282230321808b4982a011ef82714c030f3702bfdc5d60141afe9c23cb1a8a0b4e39",
    "12c50dbb004950cd341194b25e2fdd9ae95a72b93ad45293c746affff7cfa26d9aedd8cfae7013c5037375274308e7eae1eeb94ece2a9ddd2115ea34a2b832d7",
    "c5bd5d6ba44269e923787d7de5366da95c42c32a8902ffe21275b70a8f00970c372cbb92ef0182056741354b4863af58bb653473dfa338e384518dac10e957c2",
    "135580f33d43957ed220238c10adb34a3b98f1f81bafd39137038d91dbdd9d02e7698c566e0d5642d01df173309ae526728dc7893d89cb818210fef472dad779",
    "24b4b4f0faf64932a1385254c60d77bd6ee0186031826d9c534c389f10f996a55c3ddd324b0351ae4ede9a2807c47dcadc6f2ac5fd7a02136ee406a2af5c3e12"
]

headers = ["cat hash.pdf personal.txt | md5sum",
           "cat hash.pdf personal_.txt | md5sum",
           "cat hash.pdf personal.txt | sha1sum",
           "cat hash.pdf personal_.txt | sha1sum",
           "cat hash.pdf personal.txt | sha224sum",
           "cat hash.pdf personal_.txt | sha224sum",
           "cat hash.pdf personal.txt | sha256sum",
           "cat hash.pdf personal_.txt | sha256sum",
           "cat hash.pdf personal.txt | sha384sum",
           "cat hash.pdf personal_.txt | sha384sum",
           "cat hash.pdf personal.txt | sha512sum",
           "cat hash.pdf personal_.txt | sha512sum",
           "cat hash.pdf personal.txt | b2sum",
           "cat hash.pdf personal_.txt | b2sum",
           ]

sums = [128, 160, 224, 256, 384, 512, 512]

# with open("diff-temp.txt", "r") as hashedData:
#     data = []
#     for i in hashedData:
#         data.append(i.replace('\n', ''))

with open("diff.txt", "w") as resultFile:
    for i in range(0, len(data), 2):
        i1 = "{0:08b}".format(int(data[i], 16))
        i2 = "{0:08b}".format(int(data[i + 1], 16))
        differences = 0
        for (x1, x2) in zip(i1, i2):
            if x1 != x2:
                differences = differences + 1
        resultFile.write(headers[i] + '\n')
        resultFile.write(headers[i + 1] + '\n')
        resultFile.write(data[i] + '\n')
        resultFile.write(data[i + 1] + '\n')
        resultFile.write("Liczba różniących sie bitów: " + str(differences) + " z " + str(sums[i//2]) + ", procentowo: " + str("{:.2f}".format(differences/sums[i//2]*100)) + " %.\n")
        resultFile.write('\n')

