from django.http import JsonResponse, HttpResponse, HttpResponseServerError
from django.middleware.csrf import get_token
from http.client import HTTPSConnection
from urllib.parse import urlencode
from . import invitation_code
from . import utils
from . import user_info
from .models import UserInfo
import json
import os

CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
CLIENT_ID = os.environ.get('CLIENT_ID')

def signal(request):
	requestJson = json.loads(request.body)

	if utils.sanitizeRequest(requestJson) is False:
		return HttpResponseServerError("Error: Forbidden characters in request.\n")
	if user_info.verifyUser(requestJson) is False:
		return HttpResponseServerError("Error: Could not verify user identity.\n")


	if requestJson.get('answer') != None:
		if not utils.parseOffersAnswers(json.loads(requestJson["answer"])):
			return HttpResponseServerError("Error : signal offers/answers contains forbidden characters.\n")
		return invitation_code.postAnswer(request)
	else:
		if not utils.parseOffersAnswers(json.loads(requestJson["offer"])):
			return HttpResponseServerError("Error : signal offers/answers contains forbidden characters.\n")
		code = invitation_code.generate_code(request)
		if code != 1:
			return HttpResponse(content= invitation_code.generate_code(request))
		else:
			return HttpResponseServerError("Error : signal offers/answers contains forbidden characters.\n")

def sendToken(response):
	try:
		accessTokenJson = json.loads(response)
		accessToken = accessTokenJson['access_token']
		conn = HTTPSConnection('api.intra.42.fr')

		headers = {'Authorization' : f'Bearer {accessToken}'}
		conn.request('GET', '/v2/me', headers=headers)
		response = conn.getresponse().read().decode()
		response_data = json.loads(response)
		response_data['token'] = utils.generateToken()
		response_data['hashLogin'] = utils.hashStr(response_data['login'])
		response_data = user_info.getOrCreateUser(response_data)
		return HttpResponse(response_data, content_type = 'application/json')

	except Exception as error:
			return HttpResponseServerError(error)

def token(request):
		try:
			if utils.parse_input(request.body.decode()) is False:
				raise Exception("Error: Authorization code has forbidden characters.\n")
			data = {
				'client_id': CLIENT_ID,
				'code': request.body,
				'grant_type': 'authorization_code',
				'redirect_uri': 'https://hostname:1025',
				'client_secret': CLIENT_SECRET,
			}

			conn = HTTPSConnection('api.intra.42.fr')
			headers = {'Content-Type': 'application/x-www-form-urlencoded'}
			form_data = urlencode(data)

			conn.request('POST', '/oauth/token', body=form_data, headers=headers)
			response = conn.getresponse().read().decode()
			return sendToken(response)

		except Exception as error:
			return HttpResponseServerError(str(error))

def csrf(request):
	csrf_token = get_token(request)
	return JsonResponse({'csrfToken': csrf_token})


