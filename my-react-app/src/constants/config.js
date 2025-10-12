export const API_NOTIFICATION_MESSAGES ={
    loading: {
        title: 'Loading...',
        message: 'Please wait while we load the data.',
    },
    success: {
        title: 'Success',
        message: 'Data loaded successfully.',
    },
    responseFailure: {
        title: 'Error',
        message: 'Failed to load data.please try again',
    },
    requestFailure: {
        title: 'Error',
        message: 'Failed to send request. Please try again.',
    },
    networkError: {
        title: 'Error',
        message: 'Network error. Please check your internet connection.',
    }
}

export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    userLogin: { url: '/login', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    uploadFile: { url: '/file/upload', method: 'POST'},
    createPost: {url: 'create', method: 'POST'},
    getAllPost: {url: '/posts', method: 'GET', params: true},
    getPostById: {url: '/post', method: 'GET', query: true},
    updatePost: {url: '/update', method: 'PUT', query: true},
    deletePost: {url: '/delete', method: 'DELETE', query: true},
    newComment: {url: '/comment/new', method: 'POST'},
    getAllComments: {url: '/comments', method: 'GET', query: true},
    deleteComments: {url: '/comment/delete', method: 'DELETE', query: true}
}
