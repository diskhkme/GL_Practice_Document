#include "Model.h"

#include <iostream>

Model::Model()
{
}

Model::~Model()
{
	for (int i = 0; i < VAOs.size(); i++)
	{
		delete VAOs[i];
	}
	for (int i = 0; i < VBOs.size(); i++)
	{
		delete VBOs[i];
	}
	for (int i = 0; i < IBOs.size(); i++)
	{
		delete IBOs[i];
	}
	for (int i = 0; i < textureList.size(); i++)
	{
		delete textureList[i];
	}

}

void Model::LoadModel(const std::string& fileName)
{
	const size_t last_slash_idx = fileName.rfind('\\/');
	if (std::string::npos != last_slash_idx)
	{
		modelDir = fileName.substr(0, last_slash_idx);
	}

	Assimp::Importer importer;
	const aiScene* scene = importer.ReadFile(fileName,
		aiProcess_Triangulate | aiProcess_FlipUVs | aiProcess_GenSmoothNormals);

	if (!scene)
	{
		std::cout << "�� �ε� ���� ( " << fileName << " ) " << importer.GetErrorString() << std::endl;
		return;
	}

	LoadNode(scene->mRootNode, scene);
	LoadMaterials(scene);
}

void Model::RenderModel(Shader shader)
{
	for (int i = 0; i < VAOs.size(); i++)
	{
		Renderer r;

		unsigned int materialIndex = meshToTex[i];
		if (materialIndex < textureList.size() && textureList[materialIndex])
		{
			textureList[materialIndex]->Bind(materialIndex);
		}

		r.Draw(*VAOs[i], *IBOs[i], shader);
	}
}

void Model::LoadNode(aiNode* node, const aiScene* scene)
{
	for (int i = 0; i < node->mNumMeshes; i++)
	{
		LoadMesh(scene->mMeshes[node->mMeshes[i]], scene);
	}

	for (int i = 0; i < node->mNumChildren; i++)
	{
		LoadNode(node->mChildren[i], scene);
	}
}

void Model::LoadMesh(aiMesh* mesh, const aiScene* scene)
{
	std::vector<float> vertices;
	std::vector<unsigned int> indices;

	//vertex ���� parse
	for (int i = 0; i < mesh->mNumVertices; i++)
	{
		//vertex position
		vertices.insert(vertices.end(), { mesh->mVertices[i].x, mesh->mVertices[i].y, mesh->mVertices[i].z });

		//vertex uv
		if (mesh->mTextureCoords[0]) //0��° texture
		{
			vertices.insert(vertices.end(), { mesh->mTextureCoords[0][i].x, mesh->mTextureCoords[0][i].y });
		}
		else
		{
			vertices.insert(vertices.end(), { 0.0f, 0.0f });
		}

		//vertex normal
		vertices.insert(vertices.end(), { mesh->mNormals[i].x, mesh->mNormals[i].y, mesh->mNormals[i].z });
	}

	//index ���� parse
	for (int i = 0; i < mesh->mNumFaces; i++)
	{
		aiFace face = mesh->mFaces[i];
		for (int j = 0; j < face.mNumIndices; j++)
		{
			indices.push_back(face.mIndices[j]);
		}
	}

	//vao ���� VertexArray�� ���
	VertexArray* VA = new VertexArray;
	VertexBuffer* VB = new VertexBuffer{ &vertices[0], mesh->mNumVertices * 8 * sizeof(float) };
	VertexBufferLayout layout;
	layout.Push<float>(3); //vertex�� 3���� ��ġ�� ǥ���ϴ� float ������
	layout.Push<float>(2); //vertex�� 2���� �ؽ�ó ��ǥ�� ǥ���ϴ� float ������
	layout.Push<float>(3); //vertex�� 3���� ���� ���͸� ǥ���ϴ� float ������
	VA->AddBuffer(*VB, layout);
	VAOs.push_back(VA);
	VBOs.push_back(VB);

	IndexBuffer* IB = new IndexBuffer{ &indices[0], mesh->mNumFaces * 3 };
	IBOs.push_back(IB);

	meshToTex.push_back(mesh->mMaterialIndex);
}

void Model::LoadMaterials(const aiScene* scene)
{
	textureList.resize(scene->mNumMaterials);

	for (size_t i = 0; i < scene->mNumMaterials; i++)
	{
		aiMaterial* material = scene->mMaterials[i];

		textureList[i] = nullptr;

		//if there is diffuse texture,
		if (material->GetTextureCount(aiTextureType_DIFFUSE))
		{
			//texture ���� ���
			aiString path;
			if (material->GetTexture(aiTextureType_DIFFUSE, 0, &path) == AI_SUCCESS)
			{
				int idx = std::string(path.data).rfind("\\");
				std::string filename = std::string(path.data).substr(idx + 1);

				std::string texPath = modelDir + "/" + filename;

				textureList[i] = new Texture(texPath.c_str());

				if (!textureList[i])
				{
					std::cout << "�ؽ�ó �ε� ���� : " << texPath << std::endl;
					delete textureList[i];
					textureList[i] = nullptr;
				}
			}
		}

		if (!textureList[i])
		{
			//�ؽ�ó�� ���� ���
			textureList[i] = new Texture("resources/textures/uv_checker.png");
		}
	}
}